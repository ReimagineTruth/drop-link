
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useLinks } from "@/hooks/useLinks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import LinkItem from "./LinkItem";
import LinkForm from "./LinkForm";
import EmptyLinksState from "./EmptyLinksState";
import LinksLoadingState from "./LinksLoadingState";
import ProfileUrlDisplay from "./ProfileUrlDisplay";
import SocialLinksManager from "./SocialLinksManager";
import LinkTypeSelector from "./LinkTypeSelector";
import LinkScheduling from "./LinkScheduling";

const EnhancedLinksManager = () => {
  const { user, profile } = useUser();
  const { links, isLoading, fetchLinks, handleReorderLink } = useLinks(user?.id);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [selectedLinkType, setSelectedLinkType] = useState<string>('url');
  const [showScheduling, setShowScheduling] = useState<string | null>(null);

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
    setShowTypeSelector(false);
    setSelectedLinkType('url');
  };

  const handleFormSuccess = () => {
    fetchLinks();
    handleFormClose();
  };

  const handleSelectLinkType = (type: string) => {
    setSelectedLinkType(type);
    setShowTypeSelector(false);
    setShowAddForm(true);
  };

  const handleUpdateSchedule = (linkId: string, start: Date | null, end: Date | null) => {
    // Implementation for updating link schedule
    console.log('Update schedule for link:', linkId, start, end);
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

      {/* Social Links Manager */}
      <SocialLinksManager />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Links</CardTitle>
              <CardDescription>
                Manage your profile links ({links.length} total)
              </CardDescription>
            </div>
            {!showAddForm && !showTypeSelector && (
              <Button onClick={() => setShowTypeSelector(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Link
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {showTypeSelector && (
            <div className="mb-6">
              <LinkTypeSelector onSelectType={handleSelectLinkType} />
              <div className="mt-4">
                <Button variant="outline" onClick={() => setShowTypeSelector(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {showAddForm && (
            <div className="mb-6">
              <LinkForm
                linkId={editingLinkId}
                userId={user?.id}
                onCancel={handleFormClose}
                onSuccess={handleFormSuccess}
                linkType={selectedLinkType}
                initialData={editingLink ? {
                  title: editingLink.title,
                  url: editingLink.url,
                  icon: editingLink.icon
                } : undefined}
              />
            </div>
          )}

          {links.length === 0 && !showAddForm && !showTypeSelector ? (
            <EmptyLinksState onAddClick={() => setShowTypeSelector(true)} />
          ) : (
            <div className="space-y-3">
              {links.map((link, index) => (
                <div key={link.id} className="space-y-2">
                  <LinkItem
                    link={link}
                    onEdit={handleEditLink}
                    onDeleted={fetchLinks}
                    onReorder={handleReorderLink}
                    isFirst={index === 0}
                    isLast={index === links.length - 1}
                  />
                  
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowScheduling(showScheduling === link.id ? null : link.id)}
                    >
                      <Settings className="w-3 h-3 mr-1" />
                      Schedule
                    </Button>
                  </div>
                  
                  {showScheduling === link.id && (
                    <LinkScheduling
                      linkId={link.id}
                      linkTitle={link.title}
                      isScheduled={false}
                      onUpdateSchedule={handleUpdateSchedule}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedLinksManager;
