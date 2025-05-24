
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useLinks } from "@/hooks/useLinks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import LinkItem from "./LinkItem";
import LinkForm from "./LinkForm";
import EmptyLinksState from "./EmptyLinksState";
import LinksLoadingState from "./LinksLoadingState";
import ProfileUrlDisplay from "./ProfileUrlDisplay";

const LinksManager = () => {
  const { user, profile } = useUser();
  const { links, isLoading, fetchLinks, handleReorderLink } = useLinks(user?.id);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);

  const profileUrl = profile?.username 
    ? `${window.location.origin}/@${profile.username}`
    : '';

  const handleEditLink = (linkId: string) => {
    setEditingLinkId(linkId);
    setShowAddForm(true);
  };

  const handleFormClose = () => {
    setShowAddForm(false);
    setEditingLinkId(null);
  };

  const handleFormSuccess = () => {
    fetchLinks();
    handleFormClose();
  };

  const editingLink = editingLinkId ? links.find(link => link.id === editingLinkId) : null;

  if (isLoading) {
    return <LinksLoadingState />;
  }

  return (
    <div className="space-y-6">
      <ProfileUrlDisplay 
        profileUrl={profileUrl}
        username={profile?.username}
      />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Links</CardTitle>
              <CardDescription>
                Manage your profile links ({links.length} total)
              </CardDescription>
            </div>
            {!showAddForm && (
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Link
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <div className="mb-6">
              <LinkForm
                linkId={editingLinkId}
                userId={user?.id}
                onCancel={handleFormClose}
                onSuccess={handleFormSuccess}
                initialData={editingLink ? {
                  title: editingLink.title,
                  url: editingLink.url,
                  icon: editingLink.icon
                } : undefined}
              />
            </div>
          )}

          {links.length === 0 && !showAddForm ? (
            <EmptyLinksState onAddClick={() => setShowAddForm(true)} />
          ) : (
            <div className="space-y-3">
              {links.map((link, index) => (
                <LinkItem
                  key={link.id}
                  link={link}
                  onEdit={handleEditLink}
                  onDeleted={fetchLinks}
                  onReorder={handleReorderLink}
                  isFirst={index === 0}
                  isLast={index === links.length - 1}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LinksManager;
